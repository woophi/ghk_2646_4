import { Typography } from '@alfalab/core-components/typography';
import car from './assets/car.png';
import tech from './assets/tech.png';
import { appSt } from './style.css';

export const ZeroStep = ({ setFlow }: { setFlow: (v: 'car_credit' | 'cash_credit') => void }) => {
  return (
    <div className={appSt.container}>
      <div className={appSt.box} onClick={() => setFlow('car_credit')}>
        <img
          src={car}
          style={{
            height: '192px',
            objectFit: 'cover',
          }}
        />

        <Typography.Title style={{ marginLeft: '1rem' }} tag="h1" view="medium" font="system" weight="bold">
          Автокредит
        </Typography.Title>
        <Typography.Text style={{ marginLeft: '1rem' }} view="primary-medium" color="secondary">
          На новый или подержанный автомобиль
        </Typography.Text>
      </div>
      <div className={appSt.box} onClick={() => setFlow('cash_credit')}>
        <img
          src={tech}
          style={{
            height: '192px',
            objectFit: 'cover',
          }}
        />

        <Typography.Title style={{ marginLeft: '1rem' }} tag="h1" view="medium" font="system" weight="bold">
          Кредит наличными
        </Typography.Title>
        <Typography.Text style={{ marginLeft: '1rem' }} view="primary-medium" color="secondary">
          На любые нужды
        </Typography.Text>
      </div>
    </div>
  );
};
