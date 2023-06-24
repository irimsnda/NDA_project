/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialNotificationsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.NotificationsAbstractGrid',
    xtype: 'clinicaltrialnotificationsgrid',
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            table_name: 'tra_clinical_trial_applications',
            to_module_id: 7,
            beforeLoad: function () {
                var store = this.getStore();
                store.getProxy().extraParams = {
                    to_module_id: 7
                }
            }
        }
    ],
    columns: []
});