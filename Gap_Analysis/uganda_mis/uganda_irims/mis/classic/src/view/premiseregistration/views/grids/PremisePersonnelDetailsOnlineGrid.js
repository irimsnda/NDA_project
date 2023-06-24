/**
 * Created by Kip on 11/21/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisePersonnelDetailsOnlineGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premisepersonneldetailsonlinegrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Premise Personnel Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'premisepersonneldetailsonlinestr',
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
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        afterrender: function () {
            var grid = this,
                store=grid.getStore();
            store.removeAll();
            store.load();
        }
    },
    store: 'premisepersonneldetailsonlinestr',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        text: 'Telephone No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email address',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'position',
        text: 'Position',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'registration_no',
        text: 'Registration No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'study_field',
        text: 'Field of Study',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'qualification',
        text: 'Qualification',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'institution',
        text: 'Institution',
        flex: 1
    }, {
        dataIndex: 'professional_board',
        xtype: 'gridcolumn',
        text: 'Professional Board'  
    },]
});
