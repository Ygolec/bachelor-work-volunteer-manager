import { matchPattern } from 'url-matcher'



const allowedPrefixes=[
    '/auth','/volunteerSupport','/api/auth','/api/rating'
]



const allowedRoutes=[
    '/api/event/get','/api/volunteerSupport/request','/events','/reqwestForMaintenance','/rating','/api/ApplicationForParticipationInTheEvent/create','/api/ApplicationForParticipationInTheEvent/one'
]

export default function isAllowedRequest(path:string,method ='GET'){
    if (allowedPrefixes.some(prefix=>path.startsWith(prefix))) return true
    if (allowedRoutes.some(route=>path===route)) return true
    if (matchPattern('api/event/:int',path)) return true
    if (matchPattern('events/:int',path)) return true
    return false
}