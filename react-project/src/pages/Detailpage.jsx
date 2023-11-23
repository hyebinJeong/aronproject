import React, { useEffect, useState, useRef } from 'react';
import './Detailpage.css';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

import GraphLine from '../components/GraphLine';
import DetailAllTable from '../components/DetailAllTable';
import { SingleTable } from '../components/SingleTable';
import PdfFile from '../components/PdfFile';


const Detailpage = () => {
  const ref = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [datas, setDatas] = useState([]);
  const [datum, setDatum] = useState([]);
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const pid = searchParams.get('pid');

  useEffect(() => {
    axios.post('http://localhost:3001/detail/info', {
      patient_id: pid
    }).then((res) => {
      setDatas(res.data);
    });
  }, [pid]);

  useEffect(() => {
    axios.post('http://localhost:3001/detail/alldata', {
      patient_id: pid
    }).then((res) => {
      setDatum(res.data);
    });
  }, [pid]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDownload = () => {
    const element = ref.current;
    const opt = {
      margin: 10,
      filename: 'download.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>
      <div className='space'>
        <SingleTable data={datas} />

        <div>
          <button
            onClick={handleOpenModal}
            style={{
              float: 'right',
              margin: '5px',
              backgroundColor: '#0d47a1',
              width: '50px',
              height: '30px',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
          >
            PDF
          </button>
        </div>

        <GraphLine data={data} />
        <DetailAllTable data={datum} />

        <div style={{ display: 'none' }}>
          <div ref={ref}>
            <PdfFile pid={pid} />
          </div>
        </div>
      </div>

      {modalVisible && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '90%',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid black',
            overflow: 'auto',
            zIndex: 1
          }}
        >
          <div className="pdf-content" ref={ref}>
            <PdfFile pid={pid} />
          </div>
          <button
            onClick={handleDownload}
            style={{
              margin: '5px',
              backgroundColor: '#0d47a1',
              width: '100px',
              height: '30px',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
          >
            Download PDF
          </button>

          <button
            onClick={handleCloseModal}
            style={{
              float: 'right',
              margin: '5px',
              backgroundColor: '#0d47a1',
              width: '50px',
              height: '30px',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Detailpage;
