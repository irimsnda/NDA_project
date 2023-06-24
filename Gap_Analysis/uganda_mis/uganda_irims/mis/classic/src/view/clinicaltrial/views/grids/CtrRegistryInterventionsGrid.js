/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.CtrRegistryInterventionsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'clinicaltrialvctr',
    xtype: 'ctrregistryinterventionsgrid',
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
                storeId: 'onlineclinicaltrialinterventionsgridstr',
                proxy: {
                    url: 'clinicaltrial/getCtrRegistryInterventions'
                }
            },
            isLoad: true
        }
    },
    columns: [{
            dataIndex:'intervention_name',
            text:'Intervention Name',
            flex:1

        },{
            dataIndex:'intervention_description',
            text:'Intervention Description',
            flex:1

        },{
            dataIndex:'intervention_type',
            text:'Intervention Type',
            flex:1

        },{
            dataIndex:'intervention_dose',
            text:'Dose',
            flex:1

        },{
            dataIndex:'intervention_duration',
            text:'Duration',
            flex:1

        },{
            dataIndex:'group_size',
            text:'Group Size',
            flex:1

        },{
            dataIndex:'control_name',
            text:'Control Name',
            flex:1
        },{
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
                        winTitle: 'Clinical Interventions',
                        winWidth: '60%',
                        childXtype: 'ctrregistryinterventionsfrm'
                    }
                    ]
                }
            }
        } 
    ]
   
});