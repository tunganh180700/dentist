import { Box, TextField, TextareaAutosize, Typography } from "@mui/material";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecord } from "../../../redux/RecordSlice/listRecordSlice";

const ModalDetailRecord = ({
  modalDetailRecordOpen,
  setModalDetailRecordOpen,
}) => {
  const [loading, setLoading] = useState();
  const recordId = useSelector((state) => state.modal.userId);
  const dispatch = useDispatch();
  const reason = useSelector((state) => state.listRecord.reason);
  const diagnostic = useSelector((state) => state.listRecord.diagnostic);
  const causal = useSelector((state) => state.listRecord.causal);
  const date = useSelector((state) => state.listRecord.date);
  const marrowRecord = useSelector((state) => state.listRecord.marrowRecord);
  const note = useSelector((state) => state.listRecord.note);
  const treatment = useSelector((state) => state.listRecord.treatment);
  const prescription = useSelector((state) => state.listRecord.prescription);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setLoading(true);
    try {
      if (recordId > 0) {
        dispatch(fetchRecord(recordId));
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [recordId]);

  return (
    <>
      <Modal
        title={`Ngày ${date}`}
        open={modalDetailRecordOpen}
        // onOk={formik.handleSubmit}
        width={800}
        onCancel={() => setModalDetailRecordOpen(false)}
        footer={null}
      >
        <Box className="mb-3 flex gap-3 items-center">
          <div className="w-1/5">
            <p className="font-bold">Lý do đến khám:</p>
          </div>

          {/* <Typography
            variant="p"
            gutterBottom
            color="inherit"
            noWrap
            fontWeight="bold"
          >
            Lý do đến khám:
          </Typography> */}
          <TextField
            fullWidth
            value={reason}
            multiline
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box className="mb-3 flex gap-3 items-center">
          {/* <Typography
            variant="p"
            gutterBottom
            color="inherit"
            noWrap
            fontWeight="bold"
          >
            Chẩn đoán:
          </Typography> */}
          <div className="w-1/5">
            <p className="font-bold">Chẩn đoán:</p>
          </div>

          <TextField
            fullWidth
            value={diagnostic}
            multiline
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box className="mb-3 flex gap-3 items-center">
          {/* <Typography
            variant="p"
            gutterBottom
            color="inherit"
            noWrap
            fontWeight="bold"
          >
            Nguyên nhân:
          </Typography> */}
          <div className="w-1/5">
            <p className="font-bold">Nguyên nhân:</p>
          </div>
          <TextField
            fullWidth
            value={causal}
            multiline
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        {/* 
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            color="inherit"
            noWrap
            fontWeight="bold"
            style={{ marginBottom: 0 }}
          >
            Ngày khám:
          </Typography>
          <Typography variant="subtitle1" color="inherit" noWrap>
           
          </Typography>
        </div> */}
        <Box className="mb-3 flex gap-3 items-center">
          {/* <Typography
            variant="p"
            gutterBottom
            color="inherit"
            noWrap
            fontWeight="bold"
          >
            Lưu ý về tủy:
          </Typography> */}
          <div className="w-1/5">
            <p className="font-bold">Lưu ý về tủy:</p>
          </div>
          <TextField
            fullWidth
            value={marrowRecord}
            multiline
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box className="mb-3 flex gap-3 items-center">
          {/* <Typography
            variant="p"
            gutterBottom
            color="inherit"
            noWrap
            fontWeight="bold"
          >
            Ghi chú:
          </Typography> */}
          <div className="w-1/5">
            <p className="font-bold">Ghi chú:</p>
          </div>
          <TextField
            fullWidth
            value={note}
            multiline
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box className="mb-3 flex gap-3 items-center">
          {/* <Typography
            variant="p"
            gutterBottom
            color="inherit"
            noWrap
            fontWeight="bold"
          >
            Điều trị:
          </Typography> */}
          <div className="w-1/5">
            <p className="font-bold">Điều trị:</p>
          </div>
          <TextField
            fullWidth
            value={treatment}
            multiline
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Box className="mb-3 flex gap-3 items-center">
          {/* <Typography
            variant="p"
            gutterBottom
            color="inherit"
            noWrap
            fontWeight="bold"
          >
            Đơn thuốc:
          </Typography> */}
          <div className="w-1/5">
            <p className="font-bold">Đơn thuốc:</p>
          </div>
          <TextField
            fullWidth
            value={prescription}
            multiline
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ModalDetailRecord;
