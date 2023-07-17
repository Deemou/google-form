import { useAppDispatch } from '@/app/hooks';
import { setSubmitStatus } from '@/app/slices/infoSlice';
import { useEffect } from 'react';
import Layout from '@/components/layout';
import PreviewButtonBar from '@/components/user-view/preview-button-bar';
import UserFormContent from '@/components/user-view/user-form-content';
import UserFormInfo from '@/components/user-view/user-form-info';
import '@styles/form.scss';

export default function Preview() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSubmitStatus({ status: false }));
  }, []);

  return (
    <Layout>
      <UserFormInfo />
      <UserFormContent />
      <PreviewButtonBar />
    </Layout>
  );
}
