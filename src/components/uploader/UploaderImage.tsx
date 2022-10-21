import { FC, useState } from "react";
import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { REQUEST_URL } from "../../constant";
import { HttpRequestHeader, UploadFile } from "antd/lib/upload/interface";

export interface UploaderImageProps {
  defaultUrl?: string;
  onChange?: (response: any, file: UploadFile<any>) => void;
  returnFormatter?: (response: any, file: UploadFile<any>) => any;
}
const Uploader: FC<UploaderImageProps> = ({
  defaultUrl = "/file/uploadFile",
  returnFormatter,
  onChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );
  const handleChange = (info) => {
    const { status, response } = info.file;
    switch (status) {
      case "uploading":
        setLoading(true);
        break;
      case "done":
        setLoading(false);
        onChange?.(
          returnFormatter ? returnFormatter(response, info.file) : response,
          info.file
        );
        setImageUrl(response.data as string);
        break;
      case "error":
        setLoading(false);
        break;
    }
  };
  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      headers={
        (() => {
          const accountJSON = window.sessionStorage.getItem("accountInfo");
          const accountInfo = JSON.parse(accountJSON || "{}");
          return accountInfo?.token ? { Authorization: accountInfo.token } : {};
        })() as HttpRequestHeader
      }
      action={REQUEST_URL + defaultUrl}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
Uploader.defaultProps = {};
export default Uploader;
