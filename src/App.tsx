import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { InputProps } from '@alfalab/core-components/input';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useEffect, useState } from 'react';
import { carOptions, options } from './constants';
import { LS, LSKeys } from './ls';
import { FirstStepCar, FourthStepCar, SecondStepCar, SecondStepCarType, ThirdStepCar } from './StepsCar';
import { FifthStepCash, FirstStepCash, FourthStepCash, SecondStepCashDeposit, ThridStepCash } from './StepsCash';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { ZeroStep } from './ZeroStep';

export const App = () => {
  const [selectedOptionCar, setOptionCar] = useState<string>(carOptions[0]);
  const [carState, setCarState] = useState<'Подержанный' | 'Новый'>('Подержанный');
  const [carType, setCarType] = useState<string>('');

  const [steps, setStep] = useState(0);
  const [flow, setFlow] = useState<'car_credit' | 'cash_credit'>('car_credit');
  const [selectedOption, setOption] = useState<string>(options[0]);
  const [deposit, setDeposit] = useState<'Без залога' | 'Под залог'>('Без залога');
  const [depositOption, setDepositOption] = useState<'Автомобиль' | 'Квартира' | ''>('');
  const [sum, setSum] = useState(2_500_000);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [selectedYear, setYear] = useState(1);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));

  useEffect(() => {
    setOptionCar(carOptions[0]);
    setCarState('Подержанный');
    setCarType('');

    setOption(options[0]);
    setDeposit('Без залога');
    setDepositOption('');
    setSum(2_500_000);
    setChecked(false);
    setChecked2(false);
    setYear(1);
  }, [flow]);

  const disabledNextStep =
    flow === 'cash_credit'
      ? steps === 2 && !depositOption && deposit === 'Под залог'
      : steps === 2 && !carType && carState === 'Новый';

  const titleBtn =
    deposit === 'Под залог' || carState === 'Новый'
      ? steps === 5
        ? 'Продолжить'
        : 'Следущий шаг'
      : steps === 4
      ? 'Продолжить'
      : 'Следущий шаг';

  const handleSumChange: InputProps['onChange'] = (_, { value }) => {
    setSum(typeof value === 'string' ? Number(value.replace(/\s+/g, '')) : value);
  };

  const goBack = () => {
    setStep(v => v - 1);
  };
  const goNext = () => {
    switch (flow) {
      case 'cash_credit':
        if ((steps === 4 && deposit === 'Без залога') || (steps === 5 && deposit === 'Под залог')) {
          submit();
          return;
        }
        break;

      case 'car_credit':
        if ((steps === 4 && carState === 'Подержанный') || (steps === 5 && carState === 'Новый')) {
          submit();
          return;
        }
        break;
    }
    setStep(v => v + 1);
  };

  const submit = useCallback(() => {
    // if (!accountNumber) {
    //   setError('Укажите номер лицевого счёта');
    //   return;
    // }
    setLoading(true);
    setThx(true);
    setLoading(false);

    // sendDataToGA({
    //   autopayments: Number(checked) as 1 | 0,
    //   limit: Number(checked2) as 1 | 0,
    //   limit_sum: limit ?? 0,
    //   insurance: Number(checked3) as 1 | 0,
    //   email: email ? 1 : 0,
    // }).then(() => {
    //   LS.setItem(LSKeys.ShowThx, true);
    // });
  }, []);

  const content = () => {
    if (flow === 'car_credit') {
      switch (steps) {
        case 1: {
          return (
            <FirstStepCar
              carState={carState}
              selectedOptionCar={selectedOptionCar}
              setCarState={setCarState}
              setOptionCar={setOptionCar}
            />
          );
        }

        case 2: {
          if (carState === 'Новый') {
            return <SecondStepCarType carType={carType} setCarType={setCarType} />;
          }
          return (
            <SecondStepCar
              handleSumChange={handleSumChange}
              selectedOptionCar={selectedOptionCar}
              selectedYear={selectedYear}
              setYear={setYear}
              sum={sum}
            />
          );
        }
        case 3: {
          if (carState === 'Новый') {
            return (
              <SecondStepCar
                handleSumChange={handleSumChange}
                selectedOptionCar={selectedOptionCar}
                selectedYear={selectedYear}
                setYear={setYear}
                sum={sum}
              />
            );
          }
          return <ThirdStepCar checked={checked} checked2={checked2} setChecked={setChecked} setChecked2={setChecked2} />;
        }

        case 4: {
          if (carState === 'Новый') {
            return <ThirdStepCar checked={checked} checked2={checked2} setChecked={setChecked} setChecked2={setChecked2} />;
          }
          return (
            <FourthStepCar
              carState={carState}
              checked={checked}
              checked2={checked2}
              selectedOptionCar={selectedOptionCar}
              selectedYear={selectedYear}
              sum={sum}
            />
          );
        }
        case 5: {
          if (carState === 'Новый') {
            return (
              <FourthStepCar
                carState={carState}
                checked={checked}
                checked2={checked2}
                selectedOptionCar={selectedOptionCar}
                selectedYear={selectedYear}
                sum={sum}
              />
            );
          }
          return null;
        }
        default:
          return null;
      }
    }
    if (flow === 'cash_credit') {
      switch (steps) {
        case 1:
          return (
            <FirstStepCash deposit={deposit} selectedOption={selectedOption} setDeposit={setDeposit} setOption={setOption} />
          );

        case 2: {
          if (deposit === 'Под залог') {
            return <SecondStepCashDeposit depositOption={depositOption} setDepositOption={setDepositOption} />;
          }

          return (
            <ThridStepCash
              handleSumChange={handleSumChange}
              selectedOption={selectedOption}
              selectedYear={selectedYear}
              setYear={setYear}
              sum={sum}
            />
          );
        }

        case 3: {
          if (deposit === 'Под залог') {
            return (
              <ThridStepCash
                handleSumChange={handleSumChange}
                selectedOption={selectedOption}
                selectedYear={selectedYear}
                setYear={setYear}
                sum={sum}
              />
            );
          }

          return <FourthStepCash checked={checked} checked2={checked2} setChecked={setChecked} setChecked2={setChecked2} />;
        }
        case 4: {
          if (deposit === 'Под залог') {
            return (
              <FourthStepCash checked={checked} checked2={checked2} setChecked={setChecked} setChecked2={setChecked2} />
            );
          }

          return (
            <FifthStepCash
              checked={checked}
              checked2={checked2}
              deposit={deposit}
              depositOption={depositOption}
              selectedOption={selectedOption}
              selectedYear={selectedYear}
              sum={sum}
            />
          );
        }

        case 5: {
          if (deposit === 'Под залог') {
            return (
              <FifthStepCash
                checked={checked}
                checked2={checked2}
                deposit={deposit}
                depositOption={depositOption}
                selectedOption={selectedOption}
                selectedYear={selectedYear}
                sum={sum}
              />
            );
          }
          return null;
        }

        default:
          return null;
      }
    }
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  if (!steps) {
    return (
      <ZeroStep
        setFlow={v => {
          setFlow(v);
          setStep(1);
        }}
      />
    );
  }

  return (
    <>
      {content()}
      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <div className={appSt.btnLeft} onClick={loading ? undefined : goBack}>
          <CDNIcon name="glyph_chevron-left_m" />
        </div>
        <ButtonMobile
          block
          view="primary"
          className={appSt.btn}
          disabled={disabledNextStep}
          onClick={goNext}
          loading={loading}
        >
          <div className={appSt.btnContainer}>
            <div>
              <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                {titleBtn}
              </Typography.TitleResponsive>
              <Typography.Text view="primary-medium" defaultMargins={false}>
                {steps} из {deposit === 'Под залог' || carState === 'Новый' ? 5 : 4}
              </Typography.Text>
            </div>

            <div className={appSt.btnContainer}>
              <CDNIcon name="glyph_chevron-right_m" />
            </div>
          </div>
        </ButtonMobile>
      </div>
    </>
  );
};
