import Header from '@/components/header';
import FormInfo from '@/components/form-info';
import FormContent from '@/components/form-content';
import Layout from '@/components/layout';
import '@styles/form.scss';

export default function Home() {
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
