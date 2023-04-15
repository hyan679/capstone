import request from "./request";
import { getUserInfo } from "../utils";

export function userLogin(email, password) {
  return request.post("/users/login", { email, password });
}

export function getUsers(same_org = 0, query = "") {
  return request.get(`/users?query=${query}&same_org=${same_org}`);
}

export function getProjectList() {
  const { user_role: role } = getUserInfo();
  return request.get(`/projects?role=${role}`);
}

export function getProjectInfo(id) {
  return request.get(`/projects/${id}`);
}

// Application
export function getApplication(id) {
  return request.get(`/applications/${id}`);
}

export function saveApplication(id, data) {
  return request.put(`/applications/${id}`, { content: data });
}

export function submitApplication(id, data) {
  return request.post(`/applications/${id}`, { content: data, state: 1 });
}

// Permission
export function getApplicationCollaborators(id) {
  return request.get(`/applications/${id}/colloborators`);
}

export function inviteApplicationCollaborator(id, data) {
  return request.post(`/applications/${id}/colloborators`, data);
}

export function assignApplicationCollaborator(id, data) {
  return request.put(`/applications/${id}/colloborators`, data);
}

export function deleteApplicationCollaborator(id, user_id) {
  return request.delete(`/applications/${id}/colloborators`, {
    data: { user_id },
  });
}

export function getAgreementCollaborators(id) {
  return request.get(`/agreements/${id}/colloborators`);
}
export function inviteAgreementCollaborator(id, data) {
  return request.post(`/agreements/${id}/colloborators`, data);
}

export function assignAgreementCollaborator(id, data) {
  return request.put(`/agreements/${id}/colloborators`, data);
}

export function deleteAgreementCollaborator(id, user_id) {
  return request.delete(`/agreements/${id}/colloborators`, {
    data: { user_id },
  });
}

export function getApplicationList(status = null) {
  const query = status !== null && status !== "" ? `?status=${status}` : "";
  return request.get(`/applications${query}`);
}

export function assignApplicationApprover(id, user_id, permission) {
  return request.post(`/applications/${id}/approvers`, { user_id, permission });
}

export function deleteApplicationApprover(id, user_id) {
  return request.delete(`/applications/${id}/approvers`, { data: { user_id } });
}

export function getApplicationStatus(id) {
  return request.get(`/applications/${id}/status`);
}

export function rankApplication(id, before, after) {
  return request.post(`/applications/${id}/ranks`, { before, after });
}

// Contract/Aggreement
export function getContract(id) {
  return request.get(`agreements/${id}`);
}

export function getAgreementList(status = null) {
  const query = status !== null ? `?status=${status}` : "";
  return request.get(`/agreements${query}`);
}

export function saveContract(id, data) {
  return request.put(`agreements/${id}`, { content: data });
}

export function submitContract(id, data) {
  return request.post(`agreements/${id}`, { content: data, state: 1 });
}

export function commentContract(id, data) {
  return request.post(`agreements/${id}/comments`, {
    content: data,
  });
}

export function rankContract(id, before, after) {
  return request.post(`/agreements/${id}/ranks`, { before, after });
}

export function getAgreementStatus(id) {
  return request.get(`/agreements/${id}/status`);
}

export function assignContractApprover(id, user_id, permission) {
  return request.post(`/agreements/${id}/approvers`, { user_id, permission });
}

export function deleteContractApprover(id, user_id) {
  return request.delete(`/agreements/${id}/approvers`, { data: { user_id } });
}

export function getApplicationTask() {
  return request.get("applications/approver");
}

export function getContractTask() {
  return request.get("agreements/approver");
}

export function approveApplication(id, status, content = "") {
  const data = status === 1 ? { status, content } : { status };
  return request.post(`applications/${id}/approve`, data);
}

export function approveContract(id, status, content = "") {
  const data = status === 1 ? { status, content } : { status };
  return request.post(`agreements/${id}/approve`, data);
}

export function getAgreementComments(id) {
  return request.get(`agreements/${id}/comments`);
}

export function createProjectAgreement(id) {
  return request.post(`projects/${id}/agreements`, { content: "" });
}

export function getAgreementHistory(id) {
  return request.get(`agreements/${id}/history`);
}
