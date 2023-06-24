/**
 * Created by Kip on 2/13/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialOnlineDocUploadsGenericGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationPrevDocUploadsGrid',
    xtype: 'clinicaltrialonlinedocuploadsgenericgrid',
    table_name: 'tra_clinical_trial_applications',
    portal_uploads: 1
});