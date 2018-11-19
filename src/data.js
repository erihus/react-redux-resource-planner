import moment from 'moment';

const defaultData = {
  totalEngineers: 0,
  scrubber: moment().startOf('day'), 
  autoAdvanceScrubber: false,
  enableTimelineZoom: false,
  scrubberInterval: null,
  weekStart: moment().startOf('day'),
  weekEnd: moment().startOf('day').add(7, 'days'),
  serviceActions: [
    {
      id: 1,
      name: 'A',
      machineId: 1,
      start: moment().startOf('day'),
      duration: 12,
      engineers: 2,
      editing: false
    },
    {
      id: 2,
      name: 'B',
      machineId: 2,
      start: moment().startOf('day').add(1,'d'),
      duration: 24,
      engineers: 3,
      editing: false
    },
    {
      id: 3,
      name: 'C',
      machineId: 1,
      start: moment().startOf('day').add(3,'d'),
      duration: 48,
      engineers: 5,
      editing: false
    },
    {
      id: 4,
      name: 'D',
      machineId: 2,
      start: moment().startOf('day').add(4,'d'),
      duration: 12,
      engineers: 4,
      editing: false
    }
  ] 
}

export default defaultData;