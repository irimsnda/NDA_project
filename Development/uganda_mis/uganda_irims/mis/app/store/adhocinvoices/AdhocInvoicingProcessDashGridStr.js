/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/27/2018.
 */
Ext.define('Admin.store.adhocinvoices.AdhocInvoicingProcessDashGridStr', {
    extend: 'Ext.data.Store',
    alias: 'store.adhocinvoicingprocessdashgridstr',
    storeId: 'adhocinvoicingprocessdashgridstr',
    requires: [
        'Admin.model.productRegistration.ProductRegMdl'
    ],
    model: 'Admin.model.productRegistration.ProductRegMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true, grouper: {
        groupFn: function (item) {
            return item.get('process_id') + item.get('workflow_stage_id');
        }
    },
    proxy: {
        type: 'ajax',
        url: 'revenuemanagement/getAdhocInvoicingApplicationsDetails',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
			totalProperty: 'totals',
            messageProperty: 'message'
        }
    }
});
