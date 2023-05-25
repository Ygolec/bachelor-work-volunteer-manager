import {matchPattern} from 'url-matcher'


const allowedPrefixesForUser = [
    '/profile'
]
const allowedRoutesForUser = [
    ''
]

const allowedPrefixesForTeamLeader = [
    '/teamLeader', '/api/statsOfVolunteer', '/api/ApplicationForParticipationInTheEvent', '/api/fnds'
]
const allowedRoutesForTeamLeader = [
    '/api/fnds/getByIdEvent', '/api/event/get'
]
const allowedPrefixes = [
    '/auth', '/volunteerSupport', '/api/auth', '/api/rating'
]
const allowedRoutes = [
    '/api/event/get','/api/volunteerSupport/request', '/events', '/reqwestForMaintenance', '/rating', '/api/ApplicationForParticipationInTheEvent/create', '/api/ApplicationForParticipationInTheEvent/one'
]

export default function isAllowedRequest(path: string, method = 'GET', role: string) {
    if (role === 'ADMIN') return true
    if (role === 'TEAMLEADER' && allowedPrefixesForTeamLeader.some(prefix => path.startsWith(prefix))) return true
    if (role === 'TEAMLEADER' && allowedRoutesForTeamLeader.some(route => path === route)) return true
    if (role === 'USER' || role === 'TEAMLEADER' && allowedPrefixesForUser.some(prefix => path.startsWith(prefix))) return true
    if (role === 'USER' || role === 'TEAMLEADER' && allowedRoutesForUser.some(route => path === route)) return true
    if (allowedPrefixes.some(prefix => path.startsWith(prefix))) return true
    if (allowedRoutes.some(route => path === route)) return true
    if (matchPattern('api/event/:int', path)) return true
    if (matchPattern('events/:int', path)) return true
    return false
}