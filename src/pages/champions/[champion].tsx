import { NextPage } from 'next';
import { useRouter } from 'next/router';

import * as React from 'react';

const ChampionPage: NextPage = () => {
  const router = useRouter();
  const { champion } = router.query;

  return (
    <div>123</div>
  );
};

export default ChampionPage;
