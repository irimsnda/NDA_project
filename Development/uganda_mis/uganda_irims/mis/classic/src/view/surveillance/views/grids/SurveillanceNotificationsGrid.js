/**
 * Created by Kip on 5/23/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.SurveillanceNotificationsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.NotificationsAbstractGrid',
    xtype: 'surveillancenotificationsgrid',
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            table_name: 'tra_surveillance_applications',
            to_module_id: 5,
            beforeLoad: function () {
                var store = this.getStore();
                store.getProxy().extraParams = {
                    to_module_id: 5
                }
            }
        }
    ],
    columns: []
});