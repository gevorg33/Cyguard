import React, { FC, useEffect, useState, memo } from 'react';
import { Col, Row, Typography, Upload, Modal, Form } from 'antd';
import { userSelector } from '../../../store/user/selectors';
import { useSelector } from 'react-redux';
import ImgCrop from 'antd-img-crop';
import { today, getBase64 } from '../../../utils';
import { DashboardApiService } from '../../../api/dashboard-api-service';

const LayoutContentHeader: FC = (): JSX.Element => {
  const [form] = Form.useForm();
  const initList: any[] = [];
  const [fileList, setFileList] = useState<any[]>(initList);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');

  const { user } = useSelector(userSelector);

  useEffect(() => {
    if (user.id) {
      if (user?.attachments[0]) {
        const uploadedAvatarFile = {
          uid: '-1',
          name: 'user.png',
          status: 'done',
          url: user.attachments[0].path,
        };
        setFileList([uploadedAvatarFile]);
      }
    }
  }, [form, user]);

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const uploadAvatar = ({ onSuccess, onError, file }: any) => {
    const fmData = new FormData();
    fmData.append('avatar', file);
    DashboardApiService.uploadAvatar(fmData, onSuccess, onError)
      .then(() => onSuccess('ok'))
      .catch(err => onError({ err }));
  };

  const handlePreviewCancel = () => setPreviewVisible(false);


  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };

  useEffect(() => {
    setFileList(initList);
  }, []);

  return (
    <Row>
      <Col xs={0} lg={14} xl={17}>
      </Col>
      <Col xs={20} lg={6} xl={5}>
        {user.firstName &&
        <>
          <Typography.Title level={3} className='mt-20'>
            Hello, <strong>{`${user.firstName}!`}</strong>
          </Typography.Title>
          <Typography.Paragraph className='l-h-0'>
            <strong>Today is,</strong> {today()}
          </Typography.Paragraph>
        </>
        }
      </Col>
      <Col xs={4} lg={4} xl={2}>
        <Form
          layout='vertical'
          form={form}
        >
          <Form.Item name='avatar'>
            <div className='sider-logo-layout-header'>
              <ImgCrop shape='round' rotate>
                <Upload
                  listType='picture-card'
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={handlePreview}
                  customRequest={uploadAvatar}
                >
                  {fileList.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </div>
          </Form.Item>
        </Form>
      </Col>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handlePreviewCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Row>
  );
};

export default memo(LayoutContentHeader);