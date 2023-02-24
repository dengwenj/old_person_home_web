import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
} from '@ant-design/pro-components';
import { message } from 'antd';

import { getOldpersonByName } from '../../../services/user';
import { addLife, editLife, getBedroomByNum } from '../../../services/checkIn';

import type { StateBool } from '../../../global/types';

interface ICheckinRegAddEditProps {
  openCheckinRegAddEdit: boolean
  setOpenCheckinRegAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function CheckinRegAddEdit({
  openCheckinRegAddEdit,
  setOpenCheckinRegAddEdit,
  isEdit,
  record,
  reloadPage
}: ICheckinRegAddEditProps) {
  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}入住`}
      open={openCheckinRegAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpenCheckinRegAddEdit(false),
      }}
      onFinish={async (values) => {
        values.oldPersonId = values.oldPersonName.value;
        values.bedroomId = values.bedroomNum.value;
        delete values.oldPersonName;
        delete values.bedroomNum;

        if (isEdit) {
          try {
            const res = await editLife({ id: record.id, ...values });
            if (res.code !== 1) {
              message.success(res.msg);
              reloadPage();
              setOpenCheckinRegAddEdit(false);
              return
            }
            message.error(res.msg);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addLife(values);
            if (res.code !== 1) {
              message.success(res.msg);
              reloadPage();
              setOpenCheckinRegAddEdit(false);
              return
            }
            message.error(res.msg);
          } catch (error) {
            console.log(error);
          }
        }
      }}
    >
      <ProForm.Group>
        <ProFormSelect.SearchSelect
          mode='single'
          width='md'
          name="oldPersonName"
          label="姓名"
          placeholder="请搜索选择姓名"
          debounceTime={300}
          request={async ({ keyWords }) => {
            if (!keyWords) return []
            const res = await getOldpersonByName(keyWords);
            return res.data.map((item: any) => {
              return {
                value: item.id,
                label: item.oldPersonName
              }
            })
          }}
          rules={[{ message: '姓名必选', required: true }]}
        />
        <ProFormSelect.SearchSelect
          mode='single'
          width='md'
          name="bedroomNum"
          label="寝室号"
          placeholder="请搜索选择寝室号"
          debounceTime={300}
          request={async ({ keyWords }) => {
            if (!keyWords) return []
            const res = await getBedroomByNum({ bedroomNum: keyWords, isLive: 0 });
            return res.data.map((item: any) => {
              return {
                value: item.id,
                label: item.bedroomNum
              }
            })
          }}
          rules={[{ message: '寝室号必选', required: true }]}
        />
      </ProForm.Group>
      <ProFormDatePicker
        width='md'
        name="checkInTime"
        label="入住时间"
        rules={[{ message: '入住时间必选', required: true }]}
      />
    </ModalForm>
  )
}
