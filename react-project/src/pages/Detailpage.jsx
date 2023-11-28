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
  const [graphData, setgraphData] = useState(null);
  const [searchParams] = useSearchParams();
  const pid = searchParams.get('pid');

  const [startDate, setStartDate] = useState(null);  // 시작 날짜를 저장하는 상태
  const [endDate, setEndDate] = useState(null);  // 마지막 날짜를 저장하는 상태

  //SingleTable axios
  useEffect(() => {
    axios.post('http://localhost:3001/detail/info', {
      patient_id: pid
    }).then((res) => {
      setDatas(res.data);
    });
  }, [pid]);

  //
  useEffect(() => {
    axios.post('http://localhost:3001/detail/alldata', {
      patient_id: pid
    }).then((res) => {
      setDatum(res.data);
    });
  }, [pid]);

  //테이블 날짜 필터 axios
  useEffect(() => {
    const fetchData = async () => {
      if (pid !== null && startDate !== null && endDate !== null) {
        const response = await axios.post('http://localhost:3001/detail/alldata', { patient_id: pid });
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0)
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);  // endDate를 해당 날짜의 종료 시점으로 설정

        const filteredData = response.data.filter(d => {
          const recordTime = new Date(d.record_time);
          return recordTime >= start && recordTime <= end;
        });
        setDatum(filteredData);
      }
    };

    fetchData();
  }, [pid, startDate, endDate]);


  // PDF 모달창
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
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      exclude: ["#download-pdf-btn", "#pdf-close-btn", ".button"]
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div>


      <div className="space" style={{ float: 'right', display: 'flex', alignItems: 'center', width: "22vw", height: '7vh', justifyContent: 'space-between' }}>
        <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between' }}>
          {/* 날짜 확인 */}
          <label>
            <input
              style={{ width: '110px', height: '27px', border: '2px solid', borderRadius: '5px', borderColor: '#cfdaec', strokeWidth: '1px', stroke: 'black', fontFamily: 'Arial, Helvetica, sans- serif', cursor: 'pointer' }}
              type="date" value={startDate || ''} onChange={e => setStartDate(e.target.value)} />
          </label>
          -
          <label>
            <input
              style={{ width: '110px', height: '27px', border: '2px solid', borderRadius: '5px', borderColor: '#cfdaec', strokeWidth: '1px', stroke: 'black', fontFamily: 'Arial, Helvetica, sans-serif', cursor: 'pointer' }}
              type="date" value={endDate || ''} onChange={e => setEndDate(e.target.value)} />
          </label>
        </div>
        {/* PDF 모달 버튼 */}
        <button
          onClick={handleOpenModal}
          style={{
            margin: '5px',
            backgroundColor: '#0d47a1',
            width: '50px',
            height: '30px',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            cursor: 'pointer'
          }}
        >
          PDF
        </button>
      </div>

      <hr style={{ width: "100%" }} />
      <div className='space'>
        <SingleTable data={datas} />


        <GraphLine graphData={graphData} startDate={startDate} endDate={endDate} />
        <DetailAllTable data={datum} />

        <div style={{ display: 'none' }}>
          <div ref={ref}>
            <PdfFile pid={pid} data={datum} />
          </div>
        </div>

      </div>

      {
        modalVisible && (
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
              <button
                className='download-pdf-btn'
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
                className='pdf-close-btn'
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
              <PdfFile pid={pid} startDate={startDate} endDate={endDate} />
            </div>
          </div>
        )
      }
    </div >
  );
};

export default Detailpage;
