import { useAppDispatch } from '@/app/hooks';
import { setSubmitStatus } from '@/app/slices/infoSlice';
import { useEffect } from 'react';
import Header from '@/components/header';
import FormInfo from '@/components/admin-view/form-info';
import FormContent from '@/components/admin-view/form-content';
import Layout from '@/components/layout';
import '@styles/form.scss';

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSubmitStatus({ status: false }));
  }, []);

  return (
    <>
      <Header />
      <Layout>
        <FormInfo />
        <FormContent />
      </Layout>
    </>
  );
}
