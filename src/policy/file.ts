export const readExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
  const XLSX = require("xlsx");

  if (e.target.files) {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function (e) {
      if (e.target) {
        // 엑셀 파일을 워크북으로 변환
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        // 시트 선택
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // 워크시트를 JSON 형식으로 변환
        const json = XLSX.utils.sheet_to_json(worksheet);
        // option파라미터에 header:1을 설정해주면 2차원 배열로 변환
        const aoa = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        console.log(json);
        console.log(aoa);
      }
    };

    reader.readAsArrayBuffer(file);
  }
};
