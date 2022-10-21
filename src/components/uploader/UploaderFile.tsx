import { REQUEST_URL } from "../../constant";
import { Button, ButtonProps, Upload } from "antd";
import React, { FC, useState } from "react";
import {
  HttpRequestHeader,
  UploadChangeParam,
  UploadFile,
} from "antd/lib/upload/interface";
type FileListType = UploadFile<any>[];
export interface UploaderFileProps {
  openText?: React.ReactNode;
  openButtonProps?: ButtonProps;
  actionUrl?: string;
  list?: FileListType;
  defaultFileList?: FileListType;
  onSubmit?: (fileList: FileListType) => void;
  onRemove?: (file: UploadFile<any>, fileList: FileListType) => void;
  onChange?: (e: any) => void;
  returnFormatter?: (response: any, file: UploadFile<any>) => any;
}
const UploaderFile: FC<UploaderFileProps> = ({
  openText,
  openButtonProps,
  actionUrl,
  onSubmit,
  list = [],
  onChange,
  onRemove,
  returnFormatter,
  defaultFileList = [],
}) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<FileListType>(list || []);
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status, response, name } = info.file;
    let newFileList = [...info.fileList];
    switch (status) {
      case "uploading":
        setLoading(true);
        break;
      case "done":
        const formatterList = newFileList.map((file) => {
          if (file.response && returnFormatter) {
            return returnFormatter(file.response, file);
          }
          return file;
        });
        onChange?.(formatterList);
        setFileList(newFileList);
        onSubmit?.(formatterList);
        setLoading(false);
        break;
      case "error":
        setLoading(false);
        break;
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <Upload
        action={REQUEST_URL + actionUrl}
        onChange={handleChange}
        onRemove={(e) => {
          const newFileList = fileList.filter((item) => item.uid !== e.uid);
          setFileList(newFileList);
          onChange?.(newFileList);
          onRemove?.(e, newFileList);
        }}
        multiple
        showUploadList
        defaultFileList={defaultFileList}
        className="upload-list-inline"
        headers={
          (() => {
            const accountJSON = window.sessionStorage.getItem("accountInfo");
            const accountInfo = JSON.parse(accountJSON || "{}");
            return accountInfo?.token
              ? { Authorization: accountInfo.token }
              : {};
          })() as HttpRequestHeader
        }
      >
        <Button {...openButtonProps} loading={loading}>
          {openText}
        </Button>
      </Upload>
    </div>
  );
};
UploaderFile.defaultProps = {
  openText: "上传",
  openButtonProps: {},
  actionUrl: "/file/uploadFile",
};
export default UploaderFile;
