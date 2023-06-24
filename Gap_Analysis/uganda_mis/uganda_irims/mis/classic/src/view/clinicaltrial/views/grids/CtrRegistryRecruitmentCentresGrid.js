/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.CtrRegistryRecruitmentCentresGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'clinicaltrialvctr',
    xtype: 'ctrregistryrecruitmentcentresgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 320,
    config: {
        isCompare: 0
    },
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
   
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                pnlXtype = '#clinicaltrialregistrypreviewpnl';
            
            var pnl = grid.up(pnlXtype),
                application_id = pnl.down('hiddenfield[name=active_application_id]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'onlineclinicaltrialrecruitmentgridstr',
                proxy: {
                    url: 'clinicaltrial/getClinicalRecruiptmentDetails'
                }
            },
            isLoad: true
        }
    },columns: [{
        dataIndex:'recruitment_centre',
        text:'Recruitment Center',
        flex:1

    },{
        dataIndex:'street_address',
        text:'Street Address',
        flex:1

    },{
        dataIndex:'region',
        text:'Region',
        flex:1

    },{
        text:'Postal Code',
        dataIndex:'postal_code',
        flex:1

    },{
        text:'Country',
        dataIndex:'country',
        flex:1

    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit/Details',
                    iconCls: 'x-fa fa-edit',
                    handler: 'editClinicalStudySiteDetails',
                    winTitle: 'Clinical Recruitment Centers',
                    winWidth: '60%',
                    childXtype: 'ctrregistryrecruitmentcentresfrm'
                }
                ]
            }
        }
    } 
]
   
});