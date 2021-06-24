const FormatTime = (time_string) => {
  let secs = parseInt(time_string);
  return new Date(secs * 1000).toISOString().substr(11, 8);
}

export default FormatTime;
