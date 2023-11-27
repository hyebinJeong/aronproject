export const COLUMNS = [
  {
    Header: "ID",
    accessor: "patient_id",
  },
  {
    Header: "이름",
    accessor: "name",
  },
  {
    Header: "성별",
    accessor: "gender",
  },
  {
    Header: "나이",
    accessor: "age",
  },
  {
    Header: "병동 위치",
    accessor: "ward_room",
  },
  {
    Header: "기록 시간",
    accessor: "record_time",
  },
  {
    Header: "ARON Score",
    accessor: "sepsis_score",
  },
  {
    Header: "HR",
    accessor: "HR",
  },
  {
    Header: "SBP",
    accessor: "SBP",
  },
  {
    Header: "DBP",
    accessor: "DBP",
  },
  {
    Header: "BT",
    accessor: "Temp",
  },
  {
    Header: "O2Sat",
    accessor: "O2Sat",
  },
];

// 헤더 컬럼 그룹화 한 데이터.
// export const GROUPED_COLUMNS = [
//   {
//     Header: "Id",
//     Footer: "Id",
//     accessor: "id",
//   },
//   {
//     Header: "Patient_info",
//     Footer: "Patient_info",
//     columns: [
//       {
//         Header: "Name",
//         Footer: "Name",
//         accessor: "name",
//       },
//       {
//         Header: "Gender",
//         Footer: "Gender",
//         accessor: "gender",
//       },
//       {
//         Header: "Age",
//         Footer: "Age",
//         accessor: "age",
//       },
//     ],
//   },
//   {
//     Header: "Record Time",
//     Footer: "Record Time",
//     accessor: "record_time",
//   },
//   {
//     Header: "HR",
//     Footer: "HR",
//     accessor: "HR",
//   },
//   {
//     Header: "O2Sat",
//     Footer: "O2Sat",
//     accessor: "O2Sat",
//   },
//   {
//     Header: "Temp",
//     Footer: "Temp",
//     accessor: "Temp",
//   },
// ];
