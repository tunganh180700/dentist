export const baseUrl = `http://localhost:8080`

export const listUserAPI = `${baseUrl}/api/users/get_list_users`
export const getAccountByIdAPI = `${baseUrl}/api/users/`
export const updateAccountAPI = `${baseUrl}/api/users/`
export const deleteAccountAPI = `${baseUrl}/api/users/`
export const addAccountAPI = `${baseUrl}/api/users/register`

export const listPatientAPI = `${baseUrl}/api/patients/get_list_patients`
export const getPatientByIdAPI = `${baseUrl}/api/patients/`
export const addPatientAPI = `${baseUrl}/api/patients/`
export const deletePatientAPI = `${baseUrl}/api/patients/`
export const updatePatientAPI = `${baseUrl}/api/patients/`
export const searchPatientAPI = `${baseUrl}/api/patients/get_list_patients?`

export const listRoleAPI = `${baseUrl}/api/roles/get_list_roles`



export const listLaboAPI = `${baseUrl}/api/labos/get_list_labos`
export const getLaboByIdAPI = `${baseUrl}/api/labos/`
export const updateLaboAPI = `${baseUrl}/api/labos/`
export const deleteLaboAPI = `${baseUrl}/api/labos/`
export const addLaboAPI = `${baseUrl}/api/labos/`

export const getSpecimensByIdAPI = `${baseUrl}/api/specimens/`
export const addSpecimensAPI = `${baseUrl}/api/specimens/`
export const updateSpecimensAPI = `${baseUrl}/api/specimens/`
export const deleteSpecimensAPI = `${baseUrl}/api/specimens/`

export const listMaterialAPI = `${baseUrl}/api/materials/get_list_materials`
export const listAllMaterialAPI = `${baseUrl}/api/materials/get_all_material`
export const getMaterialByIdAPI = `${baseUrl}/api/materials/`
export const updateMaterialAPI = `${baseUrl}/api/materials/`
export const deleteMaterialAPI = `${baseUrl}/api/materials/`
export const addMaterialAPI = `${baseUrl}/api/materials/`


export const listMaterialImportAPI = `${baseUrl}/api/material_imports/get_list_import`
export const getMaterialImportByIdAPI = `${baseUrl}/api/material_imports/`
export const updateMaterialImportAPI = `${baseUrl}/api/material_imports/`
export const deleteMaterialImportAPI = `${baseUrl}/api/material_imports/`
export const addMaterialImportAPI = `${baseUrl}/api/material_imports/`

export const listServiceAndCategoryAPI = `${baseUrl}/api/categories/get_list_service`

export const listMaterialExportAPI = `${baseUrl}/api/material_export/get_list_export`
export const getMaterialExportByIdAPI = `${baseUrl}/api/material_export/`
export const updateMaterialExportAPI = `${baseUrl}/api/material_export/`
export const addMaterialExportAPI = `${baseUrl}/api/material_export/`
export const deleteMaterialExportAPI = `${baseUrl}/api/material_export/`

export const listAllPatientAPI = `${baseUrl}/api/patients/get_all_patients`
export const listPatientRecordByTreatmentIdAPI = `${baseUrl}/api/patient_record/get_all_record/`
export const allPatientRecordAPI = `${baseUrl}/api/patient_record/get_list_record/`
export const patientRecordAPI = `${baseUrl}/api/patient_record/`
export const addRecordAPI = `${baseUrl}/api/patient_record/`
export const deleteRecordAPI = `${baseUrl}/api/patient_record/`
export const updateRecordAPI = `${baseUrl}/api/patient_record/`

export const loginAPI = `${baseUrl}/api/login`

export const GET_LIST_TIMEKEEPING = `${baseUrl}/api/timekeeping/get_list_timekeeping?size=10&page=`
export const CHECK_IN = `${baseUrl}/api/timekeeping/checkin`
export const CHECK_OUT = `${baseUrl}/api/timekeeping/checkout`

export const listAllCategoryAPI = `${baseUrl}/api/categories/get_all_category_service`

export const addCategoryAPI = `${baseUrl}/api/categories/`
export const getCategoryByIdAPI = `${baseUrl}/api/categories/`
export const updateCategoryBySelectIdAPI = `${baseUrl}/api/categories/`


export const listServiceByCategoryIdAPI = `${baseUrl}/api/categories/get_all_service_by_category_id/`
export const listServiceAPI =  `${baseUrl}/api/categories/get_all_service`
export const getServiceByIdAPI = `${baseUrl}/api/categories/get_detail_service/`
export const deleteServiceAPI = `${baseUrl}/api/categories/delete_service/`
export const addServiceAPI = `${baseUrl}/api/categories/add_service`
export const updateServiceAPI = `${baseUrl}/api/categories/update_service/`


export const listIncomeAPI = `${baseUrl}/api/income?month=11`

export const listBillAPI = `${baseUrl}/api/bills/get_list_bills`
export const getBillByIdAPI = `${baseUrl}/api/bills/`
export const getListReceiptsByIdAPI = `${baseUrl}/api/receipts/get_list_receipts_by_treatment/`
export const getNewReceiptByIdAPI = `${baseUrl}/api/receipts/new_receipts/`
export const addNewReceiptByIdAPI = `${baseUrl}/api/receipts/`

export const listNetIncomeAPI = `${baseUrl}/api/income/net_income`
export const listTotalSpendIncomeAPI = `${baseUrl}/api/income/total_spend`


export const listTreatingServiceAPI = `${baseUrl}/api/categories/get_treating_service/`
export const listAllServiceAPI = `${baseUrl}/api/categories/get_all_service`
