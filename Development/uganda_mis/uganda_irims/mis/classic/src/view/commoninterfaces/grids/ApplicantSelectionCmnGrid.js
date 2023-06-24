/**
 * Created by Softclans on 12/18/2018.
 */
Ext.define('Admin.view.commoninterfaces.grids.ApplicantSelectionCmnGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicantselectioncmngrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame:true,
    height: 550,
    controller: 'commoninterfacesVctr',
    applicantType:'nonlocal',
    width: '100%',
   viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var status_id = record.get('status_id');
            if (status_id == 3 || status_id === 3) {
                return 'invalid-row';
            }
        }
    },
    tbar:[{
            text: 'New Trader Information',
            ui: 'soft-green',
            winTitle: 'Trader Information',
            winWidth: '70%', 
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            handler:function(btn){
                var winWidth = btn.winWidth,
                    winTitle = btn.winTitle,
                    applicant_form = Ext.widget('newtraderaccountsmanagementFrm');
                     funcShowCustomizableWindow(winTitle, winWidth, applicant_form, 'customizablewindow');

            }
        },
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color':'green'
            }
        },{xtype:'tbfill'},{
                xtype:'combo',
                emptyText:'Select Search Option',
                name:'search_field',
                store:['Customer Name', 'Email Address', 'Contact Person', 'Country'],
                
        },{
                xtype:'textfield',
                name:'search_value',
                emptyText:'Enter Search Value',
                
        },{
                text:'Search Details',
                iconCls: 'x-fa fa-search',
                ui:'soft-green',
                handler: 'funcUniformTradersearch'
        }
    ],plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
           var store = this.getStore(),
            grid = this.up('grid'),
            applicantType = grid.applicantType;
            store.getProxy().extraParams = {
                applicantType: applicantType
            }
        }
    }],
    listeners: {
        reconfigure: function (cmp, eOpts) { 
                    cmp.columns[0].setHeight('');
                    cmp.columns[1].setHeight('');
                    cmp.columns[2].setHeight('');
                    cmp.columns[3].setHeight('');
                    cmp.columns[4].setHeight('');
                    cmp.columns[5].setHeight('');
                    cmp.columns[6].setHeight('');
                    
        }
    },
    storeConfig:{
        config: {
            pageSize: 200, 
            remoteFilter: true,
            totalProperty:'totals',
            storeId: 'applicantselectioncmngridstr',
            proxy: {
                url:'tradermanagement/getApplicantsList'
            }
        },
        isLoad: true
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'identification_no',
        text: 'Trader No',tdCls:'wrap-text',
        flex:0.5,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Name',
        flex:1,
        tdCls:'wrap-text',
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'contact_person',
        text: 'Contact Person',tdCls:'wrap-text',
        flex:1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'app_physical_address',
        text: 'Physical Address',tdCls:'wrap-text',
        flex:1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_postal_address',
        text: 'Postal Address',
        flex:1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tpin_no',
        text: 'TPIN',hidden: true,
        flex:0.5,
        filter: {
            xtype: 'textfield'
        }
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'pacra_reg_no',
        text: 'Pacra Registration No',
        flex:0.5,hidden: true,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_telephone',
        text: 'Telephone',
        hidden: true,
        flex:0.5,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'app_email',
        text: 'Email',tdCls:'wrap-text',
        flex:1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',tdCls:'wrap-text',
        flex:0.5,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex:1
    }]
});
