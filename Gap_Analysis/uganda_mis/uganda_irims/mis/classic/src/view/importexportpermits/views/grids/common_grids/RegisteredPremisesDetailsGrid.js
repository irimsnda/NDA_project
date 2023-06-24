
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.RegisteredPremisesDetailsGrid', {
    extend: 'Ext.grid.Panel',
    
    controller: 'importexportpermitsvctr',
    xtype: 'registeredpremisesdetailsgrid',
    itemId: 'registeredpremisesdetailsgrid',
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
    tbar: [
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color': 'green',
                'font-style': 'italic'
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },{
            xtype: 'hiddenfield',
            name: 'section_id'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                section_id = grid.down('hiddenfield[name=section_id]').getValue();
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
            store.getProxy().extraParams = {
                application_code: application_code,
                'section_id':section_id
            };
        }
    }],

    listeners: {
        beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: true,
                proxy: {
                    url: 'importexportpermits/getTraderRegisteredPremisesDetails'
                }
            },
            isLoad: true
        }
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Premise Name',
        flex: 1,
       
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1,
       
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_reg_no',
        text: 'Registration No',
        flex: 1,
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        flex: 1,
       
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        text: 'Postal Address',
        flex: 1
    }]
});
