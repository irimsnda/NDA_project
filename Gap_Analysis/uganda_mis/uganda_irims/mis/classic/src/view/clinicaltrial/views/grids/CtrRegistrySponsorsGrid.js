/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.CtrRegistrySponsorsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'clinicaltrialvctr',
    xtype: 'ctrregistrysponsorsgrid',
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
                storeId: 'onlineclinicaltrialsponsorsgridstr',
                proxy: {
                    url: 'clinicaltrial/getClinicaltrailSponsorsData'
                }
            },
            isLoad: true
        }
    },
    
    columns: [{
        dataIndex:'sponsor_level',
        text:'Sponsor Level',
        flex:1

    },{
        dataIndex:'nature_of_sponsor',
        text:'Nature of Sponsor',
        flex:1

    },{
        dataIndex:'sponsor_name',
        text:'Sponsor Name',
        flex:1

    },{
        dataIndex:'country',
        text:'Country',
        flex:1

    },{
        dataIndex:'region',
        text:'Region',
        flex:1

    },{
        dataIndex:'physical_address',
          text:'Physical Address',
          flex:1

    } ,{
        dataIndex:'postal_address',
          text:'Postal Address',
          flex:1
    }  , {
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
                    winTitle: 'Clinical Sponsor details',
                    winWidth: '60%',
                    childXtype: 'ctrregistrysponsorsfrm'
                }]
            }
        }
    }  
]
   
});