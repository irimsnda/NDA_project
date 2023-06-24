/**
 * Created by Kip on 2/14/2019.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremRegOnlineDocUploadsGenericGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationPrevDocUploadsGrid',
    xtype: 'premregonlinedocuploadsgenericgrid',
    table_name: 'tra_premises_applications',
    portal_uploads: 1
});