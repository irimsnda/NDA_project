/**
 * Created by Kip on 2/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpAppOnlineDocUploadsGenericGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ApplicationPrevDocUploadsGrid',
    xtype: 'gmpapponlinedocuploadsgenericgrid',
    table_name: 'tra_gmp_applications',
    portal_uploads: 1
});