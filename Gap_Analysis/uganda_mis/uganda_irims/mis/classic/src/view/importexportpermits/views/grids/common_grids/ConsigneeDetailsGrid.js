/**
 * Created by Softclans on 12/18/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ConsigneeDetailsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'consigneedetailsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame:true,
    height: 550,
    applicantType:'nonlocal',
    controller:'importexportpermitsvctr',
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
    tbar:[{
            iconCls:'x-fa fa-plus',
            handler:'funcAddApplicationParamter',
            section_id: 2,
            text:'New Consignee etails',
            ui: 'soft-green',
            childXtype:'addconsigneedetailsfrm',
            storeId: 'consigneedetailsgridgridstr',
    },
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color':'green',
                'font-style':'italic'
            }
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    
    listeners: {
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'consigneedetailsgridgridstr',
               groupField:'sub_module',
                proxy: {
                    url: 'importexportpermits/getConsigneedetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        text: 'Postal Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'telephone',
        text: 'Telephone',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Email',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex: 1
    }]
});
