import { Web3Context } from "../stores/web3Context"
import { fromWei } from "../utils/helpers"

const EventItem = ({event, decimal}) => {
  return (
    <div className="t-row ">
      <div className="t-cell flex-2">{event.returnValues.from}</div>
      <div className="t-cell flex-2">{event.returnValues.to}</div>
      <div className="t-cell flex-1">{fromWei(event.returnValues.value, decimal)}</div>
    </div>
  )
}
const EventList = ({events}) => {
  console.log("events", events)
  if (!events || events.length === 0 )
    return (
      <div className="no-data">No transfer event</div>
    )
  return (
    <Web3Context.Consumer>
      {({decimal}) => {
        return (
          <div className="event-table">
            <div className="t-row t-header">
              <div className="t-cell flex-2">From</div>
              <div className="t-cell flex-2">To</div>
              <div className="t-cell flex-1">Value</div>
            </div>
            {events.map(event=> <EventItem key={event.blockHash} event={event} decimal={decimal}/>)}
          </div>)
      }}
    </Web3Context.Consumer>

  )
}
export default EventList
