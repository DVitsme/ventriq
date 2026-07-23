import { AnnouncementBar } from "./announcement-bar";
import { Nav } from "./nav";
import { announcementState, navCta, nightOf } from "@/lib/calendar";

/** Server chrome: computes all time-aware state once per request from the
 *  single calendar util, passes plain props down to client components. */
export function TopChrome() {
  const now = new Date();
  return (
    <>
      <AnnouncementBar
        state={announcementState(now)}
        nightTitle={nightOf(now)?.title}
      />
      <Nav cta={navCta(now)} />
    </>
  );
}
