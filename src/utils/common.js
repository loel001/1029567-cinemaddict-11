import moment from "moment";

export const formatTime = (date) => {
  const duration = moment.duration(date, `minutes`);
  const hours = duration.hours();
  const minutes = duration.minutes();
  return `${hours}` + `h` + ` ` + `${minutes}` + `m`;
};

export const formatDate = (date) => {
  return moment(date).format(`YYYY`);
};

export const formatPopupDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (date) => {
  const difference = moment().diff(date, `days`);
  const differenceMinute = moment().diff(date, `minutes`);
  if (differenceMinute < 1440) {
    return moment(date).fromNow();
  }
  if (difference >= 1 && difference <= 31) {
    const newDate = moment(date).fromNow();
    const time = moment(date).format(`hh:mm`);
    return `${newDate}` + ` at ` + `${time}`;
  }
  return moment(date).format(`DD/MM/YYYY hh:mm`);
};

export const isSelectedType = (dateA, dateB, type) => {
  if (type === null) {
    return true;
  }
  return moment(dateA).diff(moment(dateB), type) === 0;
};

export const getDuration = (time) => {
  return moment.duration(time, `minutes`);
};
