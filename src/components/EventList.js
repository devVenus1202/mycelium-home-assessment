
const EventItem = ({event}) => {
  return (
    <div className="t-row ">
      <div className="t-cell flex-2">{event.returnValues.from}</div>
      <div className="t-cell flex-2">{event.returnValues.to}</div>
      <div className="t-cell flex-1">{event.returnValues.value}</div>
    </div>
  )
}
const EventList = ({events}) => {
  if (!events || events.length === 0 )
    return (
      <div className="no-data">No transfer event</div>
    )
  return (
    <div className="event-table">
      <div className="t-row t-header">
        <div className="t-cell flex-2">From</div>
        <div className="t-cell flex-2">To</div>
        <div className="t-cell flex-1">Value</div>
      </div>
      {events.map(event=> <EventItem key={event.blockHash} event={event}/>)}
    </div>
  )
}
export default EventList
