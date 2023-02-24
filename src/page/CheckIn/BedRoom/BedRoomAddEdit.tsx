import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

import { addBedRoom, editBedRoom } from '../../../services/checkIn';

import type { StateBool } from '../../../global/types';

interface IBedRoomAddEditProps {
  openBedRoomAddEdit: boolean
  setOpenBedRoomAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function BedRoomAddEdit({
  openBedRoomAddEdit,
  setOpenBedRoomAddEdit,
  isEdit,
  record,
  reloadPage
}: IBedRoomAddEditProps) {
  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}寝室`}
      open={openBedRoomAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpenBedRoomAddEdit(false),
      }}
      onFinish={async (values) => {
        if (isEdit) {
          try {
            const res = await editBedRoom({ id: record.id, ...values });
            message.success(res.msg);
            reloadPage();
            setOpenBedRoomAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addBedRoom(values);
            message.success(res.msg);
            reloadPage();
            setOpenBedRoomAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        }
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="bedroomNum"
          label="寝室号"
          placeholder="请输入寝室号"
          rules={[{ message: '寝室号必填', required: true }]}
        />
        <ProFormDigit
          width="md"
          name="disPersonNum"
          label="寝室规定人数"
          placeholder="请输入规定人数"
          rules={[{ message: '规定人数必填', required: true }]}
        />
      </ProForm.Group>
      <ProFormDigit
        width="md"
        name="price"
        label="价格"
        placeholder="请输入价格"
        rules={[{ message: '价格必填', required: true }]}
      />
    </ModalForm>
  )
}
