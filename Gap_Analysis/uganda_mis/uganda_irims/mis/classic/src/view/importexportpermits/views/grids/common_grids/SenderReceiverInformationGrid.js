/**
 * Created by Kip on 12/18/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.SenderReceiverInformationGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'senderreceiverinformationgrid',
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
            text:'New Sender/Receiver Details',
            ui: 'soft-green',
            childXtype:'addsenderreceiverdetailsfrm',
            storeId: 'senderreceiverinformationgridstr',
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
        beforeLoad:function(){
            this.fireEvent('senderreceiverinformationgrid', this);
        }
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
                storeId: 'senderreceiverinformationgridstr',
               groupField:'sub_module',
                proxy: {
                    url: 'importexportpermits/getSenderreceiverinformation'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'app_physical_address',
        text: 'Physical Address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_postal_address',
        text: 'Postal Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tin_no',
        text: 'TIN',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'app_telephone',
        text: 'Telephone',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_email',
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
