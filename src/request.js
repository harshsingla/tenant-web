import axios from 'axios'
import { apiUrl } from './settings'
import {
    fullBrowserVersion,
    browserName,
    osVersion,
    osName
} from "react-device-detect";
import { saveAs } from 'file-saver';
import moment from 'moment'
let authAxios = axios.create({
    baseURL: apiUrl
})

export const getToken = () => {
    return {
        headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
            type: "WEB",
            fullbrowserversion: fullBrowserVersion,
            browsername: browserName,
            osversion: osVersion,
            osname: osName
        }
    }
}
export const getTokenFromParams = (token) => {
    return {
        headers: {
            Authorization: 'Token ' + token,
            type: "WEB",
            fullbrowserversion: fullBrowserVersion,
            browsername: browserName,
            osversion: osVersion,
            osname: osName
        }
    }
}
export const getTokenFromParamsForFile = (token) => {
    return {
        headers: {
            Authorization: 'Token ' + token,
            'content-type': 'multipart/form-data; boundary=ebf9f03029db4c2799ae16b5428b06bd',
            type: "WEB",
            fullbrowserversion: fullBrowserVersion,
            browsername: browserName,
            osversion: osVersion,
            osname: osName
        }
    }
}
class Request {

    error = err => {
        try {
            if (err.response.status === 401) {
                localStorage.clear()
            }
        } catch (e) {
        }
    }

    // ------------------------------------------- API Start from here --------------------------------------------- //
    getCountries(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/countries', { ...data })
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    signup(data, recaptchaToken) {
        return new Promise((next, error) => {
            authAxios
                .post('/customer/signup', data)
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    checkEmail(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/signup', data)
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }

    login(data, recaptchaToken) {
        return new Promise((next, error) => {
            authAxios
                .post('/customer/login', data)
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    // user api

    getProfile() {
        return new Promise((next, error) => {
            authAxios
                .post('/customer/details', {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getProfileFromToken(token) {
        return new Promise((next, error) => {
            authAxios
                .post('/customer/details', {}, getTokenFromParams(token))
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    updateProfile(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/customer/update', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    selectPlan(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/customer/selectplan', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }

    //department
    adddept(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/department/add', data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    allDept(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/department/list', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getDept(id) {
        return new Promise((next, error) => {
            authAxios
                .post(`/department/${id}`, { }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    updateDept(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/department/update', data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    deleteDept(id) {
        return new Promise((next, error) => {
            authAxios
                .post(`/department/delete/${id}`, {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    //choose number
    getNumbers(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/customer/numbers/choose?', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    updateNumber(id, data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/numbers/update/${id}`, { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getNumberCode(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/customer/numbers/phonecodes', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getAllNumbers(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/customer/numbers/get', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    deleteNumbers(id) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/numbers/delete/${id}`, {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    addNumber(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/choosenumber', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    //caller
    addCaller(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/callers/new', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    allCaller(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/callers', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getCaller(id, data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/callers/${id}`, { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    updateCaller(id, data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/callers/update/${id}`, { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    deleteCaller(id) {
        return new Promise((next, error) => {
            authAxios
                .post(`/callers/delete/${id}`, {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    //plans
    addPlans(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/plans', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    allPlans(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/plans', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getPlans(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/plans', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    updatePlans(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/plans', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    deletePlans(data) {
        return new Promise((next, error) => {
            authAxios
                .post('/plans', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    allDocumentTypeWithToken(data, token) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/customer/docs/type', { ...data }, getTokenFromParams(token))
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    UploadDocument(data, token) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/customer/docs/new', data, getTokenFromParamsForFile(token))
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    dashboard(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/dashboard', data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getLiveCalls(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/dashboard/live-summary', data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getCallsTable(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/dashboard/live-list', data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getCallsAgents(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/dashboard/callers', data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    graph(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/dashboard/graph', data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    //call history
    callHistory(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/call/log', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getFiles(data, value) {
        return new Promise((next, error) => {
            authAxios
                .post(`/serve`, { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    ListCallBack(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/callers/callback', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    addDnc(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/customer/settings/dnc/new', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    ListDnc(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/customer/settings/dnc', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    deleteDnc(id) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/dnc/delete/${id}`, {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    uploadDnc(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/dnc/upload`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    addQueue(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/queue/new`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    deleteQueue(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/queue/delete`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    fetchQueue(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/queue/fetch`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    updateQueue(id, data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/queue/update/${id}`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    //restricted contacts
    addRestrictedContacts(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/customer/settings/block/new', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    ListRestrictedContacts(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/customer/settings/block', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    deleteRestrictedContacts(id) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/block/delete/${id}`, {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    uploadRestrictedContacts(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/block/upload`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getCustomerSettings(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    updateCustomerSettings(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/update`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getReport(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/call/report`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getReportOfAbandonCalls(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/call/abandon`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getBillingContacts(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/billing`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    addBillingContacts(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/billing/new`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    updateBillingContacts(id, data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/billing/update/${id}`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    deleteBillingContacts(id) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/billing/delete/${id}`, {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }

    getHolidays(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/holiday`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    addHolidays(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/holiday/new`, data, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    deleteHolidays(id) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/holiday/delete/${id}`, {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    getFileForHolidays(id) {
        return new Promise((next, error) => {
            authAxios
                .post(`/customer/settings/holiday/${id}`, {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    contacts(data) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post('/customer/contacts', { ...data }, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    hangupCall(id) {
        return new Promise((next, error) => { //apoi ni h
            authAxios
                .post(`/channel/caller-hangup/${id}`, {}, getToken())
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    downloadRecording(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/serve/recording-zip`, { ...data }, getToken())
                .then(d => {
                    const linkSource = 'data:' + 'application/zip' + ';base64, ' + d?.data?.data;
                    const downloadLink = document.createElement("a");
                    downloadLink.href = linkSource;
                    downloadLink.download = 'Recording.zip';
                    downloadLink.click();
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    downloadXlsForDailyCalls(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/call/daily-download`, { ...data }, getToken())
                .then(d => {
                    const linkSource = 'data:' + 'application/xls' + ';base64, ' + d?.data?.data;
                    const downloadLink = document.createElement("a");
                    downloadLink.href = linkSource;
                    downloadLink.download = 'DailyCallReports.xls';
                    downloadLink.click();
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    downloadXlCalls(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/call/log-download`, { ...data }, getToken())
                .then(d => {
                    const linkSource = 'data:' + 'application/xls' + ';base64, ' + d?.data?.data;
                    const downloadLink = document.createElement("a");
                    downloadLink.href = linkSource;
                    downloadLink.download = 'CallHistory.xls';
                    downloadLink.click();
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
    downloadXlsForAgents(data) {
        return new Promise((next, error) => {
            authAxios
                .post(`/call/agent-download`, { ...data }, getToken())
                .then(d => {
                    const linkSource = 'data:' + 'application/xls' + ';base64, ' + d?.data?.data;
                    const downloadLink = document.createElement("a");
                    downloadLink.href = linkSource;
                    downloadLink.download = 'AgentsCallReports.xls';
                    downloadLink.click();
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    this.error(err)
                })
        })
    }
}

export default new Request();