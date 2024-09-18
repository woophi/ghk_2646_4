import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#fff',
});

const bottomFix = style({
  position: 'fixed',
  zIndex: 2,
  bottom: 92,
  width: '100%',
  padding: '12px !important',
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const box = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  borderRadius: '24px',
  border: '2px solid #F8F8F8',
  overflow: 'hidden',
  paddingBottom: '1rem',
  maxHeight: '300px',
  backgroundColor: '#F8F8F8',
});

const row = style({
  borderRadius: '1rem',
  backgroundColor: '#F8F8F8',
  padding: '12px 16px',
});

const switchItem = style({});

globalStyle(`${switchItem} > span > span:first-child`, {
  fontWeight: 500,
});

const slider = style({
  borderRadius: '1rem !important',
  marginTop: '1rem',
});

const slid = style({
  width: 'calc(100% - var(--slider-input-progress-margin-horizontal) * 2) !important',
});

const swSlide = recipe({
  base: {
    minWidth: '58px',
    maxWidth: 'max-content',
    height: '32px',
    backgroundColor: '#F8F8F8',
    padding: '4px 12px',
    borderRadius: '1rem',
    fontSize: '14px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#6F6F6F',
    transition: 'all .25s ease',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: '#E93B3C',
        color: '#FFF',
      },
    },
  },
});

const btnContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'left',
  gap: '1rem',
});
const btn = style({
  borderRadius: '24px',
  padding: '1rem',
});

const btnsRadio = style({
  borderRadius: '1rem',
  padding: '4px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '4px',
  backgroundColor: '#F8F8F8',
});

const btnRadio = recipe({
  base: {
    borderRadius: '12px',
    padding: '8px',
    backgroundColor: 'transparent',
    textAlign: 'center',
    transition: 'all .25s ease',
    color: '#6F6F6F',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: '#FFF',
        color: '#000000',
        fontWeight: 600,
      },
    },
  },
});

const btnLeft = style({
  minWidth: '77px',
  height: '77px',
  padding: '0',
  borderRadius: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F8F8F8',
});

const depositRow = recipe({
  base: {
    borderRadius: '1rem',
    backgroundColor: '#F8F8F8',
    padding: '12px 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: '#000000',
        color: '#fff',
      },
    },
  },
});

const moneyBox = style({
  border: '1px solid #F8F8F8',
  borderRadius: '1rem',
  padding: '12px 1rem',
  display: 'flex',
  justifyContent: 'space-between',
});

const tags = style({
  maxWidth: '300px',
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  justifyContent: 'center',
});
const tag = style({
  border: '1px solid #F8F8F8',
  borderRadius: '1rem',
  padding: '4px 12px',
  textAlign: 'center',
});

const imgCenter = style({
  height: ' calc(100vh - 68px - 280px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const appSt = {
  bottomBtn,
  container,
  box,
  row,
  switchItem,
  slider,
  slid,
  swSlide,
  btn,
  btnContainer,
  btnRadio,
  btnsRadio,
  btnLeft,
  depositRow,
  moneyBox,
  tag,
  tags,
  bottomFix,
  imgCenter,
};
