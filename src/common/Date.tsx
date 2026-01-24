export const stringToDate: any = (params: any) => {
  let localTimezone = null;
  let localDate = null;
  localTimezone = new Date(params);

  let date = localTimezone.getDate();
  let month = localTimezone.getMonth() + 1;
  let year = localTimezone.getFullYear();

  localDate = `${date}/${month}/${year}`;
  return localDate;
}

export const formatToyyyymmdd: any = (params: any) => {
  let localTimezone = null;
  let localDate = null;
  localTimezone = new Date(params);

  let date = localTimezone.getDate();
  let month = localTimezone.getMonth() + 1;
  let year = localTimezone.getFullYear();

  localDate = `${year}-0${month}-0${date}`;
  return localDate;
}

export const dateFormateYYYYMMDD: any = (params: any) => {
  let date = new Date(params);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate);

  return formattedDate;
}

export const stringToDateTime: any = (params: any) => {
  let localTimezone = null;
  let localDate = null;
  localTimezone = new Date(params);

  let date = localTimezone.getDate();
  let month = localTimezone.getMonth() + 1;
  let year = localTimezone.getFullYear();

  localDate = `${date}.${month}.${year} ${localTimezone.getHours()}:${localTimezone.getMinutes()}`;
  return localDate;
}

// export const formatDate : any = (params : any) => {
//     let options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
//     const date = new Date(params);
//     return date.toLocaleDateString('en-US', options);
//   };

export const formatDate = (params: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const date = new Date(params);
  return date.toLocaleDateString('en-US', options);
};