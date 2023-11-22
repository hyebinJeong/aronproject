from flask import Flask, jsonify, request
from flask_restx import Resource, Api, reqparse
from flask_cors import CORS
import pandas as pd
import pymysql

import torch
import numpy as np
import torch.nn as nn
import pickle as pkl
import torch.nn.functional as F

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/model": {"origins": "http://localhost:3000"}}, supports_credentials=True)
app.config['DEBUG'] = True

db = pymysql.connect(host = 'project-db-stu3.smhrd.com',
                     user = 'Insa4_JSB_final_3',
                     password = 'aishcool3',
                     database = 'Insa4_JSB_final_3',
                     port = 3308,
                     charset = 'utf8')

cursor = db.cursor()

class ARON(nn.Module):
    
    def __init__(self, input_size, hidden_size, dropout_rate=0.5):
        super(ARON, self).__init__()
        self.hidden_size = hidden_size
        self.embedding1 = nn.Linear(input_size, hidden_size)
        self.embedding2 = nn.Linear(hidden_size, hidden_size)
        self.embedding3 = nn.Linear(hidden_size, hidden_size)
        self.layer_norm = nn.LayerNorm(hidden_size)
        self.lstm = nn.LSTM(input_size=hidden_size,
                            hidden_size=hidden_size,
                            num_layers=2,
                            batch_first=True,
                            bidirectional=True)

        self.fc1 = nn.Linear(hidden_size*2, hidden_size)  # Output from bidirectional LSTM is concatenated, hence *2
        self.dropout = nn.Dropout(dropout_rate)
        self.fc2 = nn.Linear(hidden_size, 1)  # Binary classification, one output unit with sigmoid activation

    def forward(self, x):
        x1 = F.relu(self.embedding1(x))
        x1 = self.dropout(self.layer_norm(x1))
        x2 = F.relu(self.embedding2(x1))
        x2 = self.dropout(self.layer_norm(x2))
        x3 = F.relu(self.embedding3(x1+x2))
        x3 = self.dropout(self.layer_norm(x3))
        lstm_out, _ = self.lstm(x2 + x3)
        lstm_out = lstm_out[:, -1]
        x = F.relu(self.fc1(lstm_out))
        x = self.dropout(x)
        x = self.fc2(x).squeeze(dim=1)  # Squeeze to remove singleton dimension for binary classification
        return torch.sigmoid(x)  # Apply sigmoid activation for binary classification

vital_cols=['HR', 'O2Sat', 'Temp', 'SBP', 'MAP', 'DBP', 'Resp', 'EtCO2',
   'BaseExcess', 'HCO3', 'FiO2', 'pH', 'PaCO2', 'SaO2', 'AST', 'BUN',
   'Alkalinephos', 'Calcium', 'Chloride', 'Creatinine', 'Bilirubin_direct',
   'Glucose', 'Lactate', 'Magnesium', 'Phosphate', 'Potassium',
   'Hct', 'Hgb', 'PTT', 'WBC', 'Age', 'Platelets']

col_stat = pkl.load(open('./col_stat.pkl', 'rb'))
model = ARON(len(vital_cols)*2, 128)
model.load_state_dict(torch.load('model/trained_model_epoch9.pth', map_location=torch.device('cpu')))
model.eval()


# @app.route('/test', methods = ['GET', 'POST'])
# def chicken() :
    
#     if not db.open:
#         db.connect()
    
    
#     patient_id = 9891
#     sql = 'select * from data where patient_id = %s'
    
#     cursor.execute(sql, (patient_id,))
    
#     data = cursor.fetchall()
    
#     column_names = [i[0] for i in cursor.description]
#     df = pd.DataFrame(data, columns=column_names)
    
#     db.close()
    
#     return jsonify(data)

@app.route('/model', methods=['GET', 'POST'])



def predict() :
    def make_window(df, feature_columns, sequence_length=30):
        features = df[feature_columns].values
        
        if len(features) < sequence_length:
            x = np.zeros([sequence_length, len(feature_columns)])
            x[-len(features):] = features
        else:
            x = features[-sequence_length:]

        return torch.tensor(x).to(torch.float32)
    
    def preprocess(df):
        vital_cols=['HR', 'O2Sat', 'Temp', 'SBP', 'MAP', 'DBP', 'Resp', 'EtCO2',
        'BaseExcess', 'HCO3', 'FiO2', 'pH', 'PaCO2', 'SaO2', 'AST', 'BUN',
        'Alkalinephos', 'Calcium', 'Chloride', 'Creatinine', 'Bilirubin_direct',
        'Glucose', 'Lactate', 'Magnesium', 'Phosphate', 'Potassium',
        'Hct', 'Hgb', 'PTT', 'WBC', 'Age', 'Platelets']
        
        for col in vital_cols:
            df[f'{col}_mask'] = 1
            df.loc[pd.isna(df[col]), f'{col}_mask'] = 0
            if pd.isna(df.at[df.index[0], col]):
                df.at[df.index[0], col] = col_stat[col]['median'] 
            df[col] = df[col].fillna(method='ffill')
            df[col] = (df[col]-col_stat[col]['mean'])/col_stat[col]['std']
        
        x = make_window(df, vital_cols + [f'{col}_mask' for col in vital_cols], 30)
        return x.unsqueeze(0)


    def predict_sepsis(df):
        result_tensor = model(
            preprocess(df)
        )
        result_np = result_tensor.detach().numpy().tolist()
        return result_np
        
    if not db.open:
        db.connect()
        
    patient_id = 9891
    # sql = 'select * from data where patient_id = %s'
    sql = 'select * from data as d inner join patient as p on d.patient_id = p.patient_id and p.patient_id = %s'
    
    cursor.execute(sql, (patient_id,))
    
    data = cursor.fetchall()
    
    column_names = [i[0] for i in cursor.description]
    df = pd.DataFrame(data, columns=column_names)
    df.rename(columns = {'age' : 'Age'}, inplace=True)
    
    db.close()
    
    prediction_result = predict_sepsis(df)
    return jsonify(prediction_result)




@app.route('/model', methods=['OPTIONS'])
def handle_options():
    return '', 200, {'Access-Control-Allow-Origin': 'http://localhost:3000',
                     'Access-Control-Allow-Headers': 'Content-Type'}


if __name__ == '__main__' :
    app.run(debug=True, use_reloader=False)