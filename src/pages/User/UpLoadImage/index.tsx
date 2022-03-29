import {Col, Row, Upload, Skeleton, message, Image, Form, Input, Select, Button} from "antd";
import MyUpLoad from '@/component/MyUpLoad'
import {useEffect, useState} from "react";
import {CloudUploadOutlined, PlusOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";
import UserInput from "@/pages/User/UserInfo/compoment/UserInput";

interface PreImage {
  status: string,
  type: string,
  result: boolean,
  message: string,
  color?: string,
  url?: string,
  width?: string,
  height?: string,
  shape?: string,
}


export default ()=>{
  const [form] = Form.useForm();
  const [previewImage ,setPreviewImage] = useState<PreImage | null>();
  const [fileList ,setFileList] = useState<any[]>([]);


  useEffect(()=>{
    console.log(previewImage)
    //当预览图片切换则更新表单
    form.resetFields();
  },[previewImage])





  const onBeforeUpload = (file: RcFile)=>{
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error("仅支持上传jpg/png格式的文件");
      return false;
    }
    if (file.size / 1024 / 1024 > 8) {
      message.error('上传图片不能超过8M!');
      return false;
    }
  }

  const handleChange = (obj: any) => {
    const {file ,fileList ,event} = obj;
    handlePreviewImage(file);
    // if(file.status == 'done'){
    //   const pre: PreImage = {
    //     status: file.status,
    //     type: file.type,
    //     result: file.response.result,
    //     message: file.response.message,
    //   }
    //   if(file.response.result){
    //     pre.color = file.response.data[0];
    //     pre.url = "http://localhost:8088/image/" + file.response.data[1];
    //     pre.width = file.response.data[2];
    //     pre.height = file.response.data[3];
    //     pre.shape = file.response.data[4];
    //   }
    //   setPreviewImage(pre)
    // }else if(file.status == 'error'){
    //   setPreviewImage(null)
    // }
    console.log("onChange: " ,file,fileList,event)
    setFileList(fileList)
  };

  //处理预览图片数据
  const handlePreviewImage = (file: any) => {
    if(file.status == 'done'){
      const pre: PreImage = {
        status: file.status,
        type: file.type,
        result: file.response.result,
        message: file.responsemessage,
      }
      if(file.response.result){
        pre.color = file.response.data[0];
        pre.url = "http://localhost:8088/image/" + file.response.data[1];
        pre.width = file.response.data[2];
        pre.height = file.response.data[3];
        pre.shape = file.response.data[4];
      }
      setPreviewImage(pre)
    }else if(file.status == 'error'){
      setPreviewImage(null)
    }

  };

  const onCancel = ()=>{

  }
  const onSubmit = (values: any)=>{
    console.log(values)
  }





  return(
    <div style={{height:'100%'}}>
      <Row style={{height:'100%'}}>
        <Col span={5}
             style={{minWidth:105,}}
        >
          <Upload
            action="http://localhost:8088/upload/image"
            accept={".png,.jpeg,.jpg"}
            fileList={fileList}
            listType="picture-card"
            showUploadList={{showRemoveIcon:false}}
            onPreview={handlePreviewImage}
            beforeUpload={onBeforeUpload}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}

          </Upload>
          {
            fileList.length >= 8 ? (
              <div style={{}}>
                <Button type={"primary"} style={{width: 105}}>清除</Button>
              </div>
            ): null

          }
        </Col>
        <Col span={8}>
          {
            previewImage && previewImage.result ? (
              <Form
                form={form}
                onFinish={onSubmit}
                initialValues={
                  {
                    color: previewImage.color,
                    width: previewImage.width,
                    height: previewImage.height,
                    shape: previewImage.shape,
                  }
                }
              >
                <Form.Item label="标题" name={'title'}
                           // rules={[{ required: true,message: '标题不能为空'}]}
                           labelCol={{span: 4}}>
                  <Input  name={"title"}/>
                </Form.Item>
                <Form.Item label="标签" name={'tags'}
                           rules={[{ required: true, message: '至少选择一个合适的标签'}]}
                           labelCol={{span: 4}}>
                  <Select placeholder="选择合适标签">
                    <Select.Option value="china">China</Select.Option>
                    <Select.Option value="usa">U.S.A</Select.Option>
                  </Select>
                </Form.Item>
                <Row>
                  <Col span={12}>
                    <Form.Item label="颜色" name={'color'}
                               labelCol={{span: 8}} >
                      <Input disabled={true}/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="类型" name={"shape"}
                               labelCol={{span: 8}}
                    >
                      <Input disabled={true}/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item label="宽度" name={"width"}
                               labelCol={{span: 8}}
                    >
                      <Input disabled={true}/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="高度" name={"height"}
                               labelCol={{span: 8}}
                    >
                      <Input disabled={true}/>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="描述" name={'desc'} labelCol={{span: 4}}>
                  <Input.TextArea  name={"desc"}/>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    <CloudUploadOutlined />
                    确定上传
                  </Button>
                  <Button type="link" onClick={onCancel} >
                    删除
                  </Button>
                </Form.Item>
              </Form>

            ) : (
              <div>
                <Skeleton  />
                <Skeleton  />
                <Skeleton  />
              </div>
            )
          }


        </Col>
        <Col span={1}></Col>
        <Col span={10}
             style={{
               height:'100%',
               display:'flex',
               alignItems:'center',
               justifyContent:'center',
             }}>
          {
            previewImage && previewImage.result ? (
              <Image
                // @ts-ignore
                width={previewImage.width >= previewImage.height ? '100%' : null }
                // height={'100%'}
                style={{
                  maxHeight: 520,
                  maxWidth:520,
                }}
                src={previewImage.url}
              />
              // <div>sfsdfsdf</div>
              // <img alt="example"
              //      style={{ height: '100%' }}
              //      src={previewImage.url} />
            ) : (
              <Image
                width={'100%'}
                height={'100%'}
                src="error"
                fallback="data:image/png;base64,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"
              />
            )
          }

        </Col>

      </Row>
    </div>
  )
}
