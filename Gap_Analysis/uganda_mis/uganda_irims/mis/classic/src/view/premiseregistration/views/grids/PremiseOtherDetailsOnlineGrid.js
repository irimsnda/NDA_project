/**
 * Created by Kip on 10/19/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseOtherDetailsOnlineGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'premiseotherdetailsonlinegrid',
    store: 'premiseotherdetailsonlinestr',
    config: {
        isWin: 0,
        isOnline: 0
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'premiseotherdetailsonlinestr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                wizard = grid.up('newpremiseonlinepreviewwizard'),
                premiseFrm = wizard.down('premisedetailsfrm'),
                premise_id = premiseFrm.down('hiddenfield[name=premise_id]').getValue();
            store.getProxy().extraParams = {
                premise_id: premise_id
            };
        }
    }],
    listeners: {
        afterrender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'business_type_detail',
        text: 'Business Type Details',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'business_type',
        text: 'Business Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_category',
        text: 'Product Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_category',
        text: 'Product Sub Category',
        flex: 1
    },]
});