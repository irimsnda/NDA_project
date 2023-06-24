/**
 * Created by Kip on 1/18/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialMonitorsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ClinicalTrialPersonnelAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'clinicaltrialmonitorsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 320,
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
            xtype: 'button',
            text: 'Add Monitor',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            name: 'add_otherinvestigator',
            childXtype: 'clinicaltrialpersonnelgrid',
            winTitle: 'Clinical Trial Personnel Selection List',
            winWidth: '90%',
            personnel_type: 'clinical_monitor'
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
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
                storeId: 'clinicaltrialmonitorssstr',
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialMonitors'
                }
            },
            isLoad: true
        }
        },
    columns: [
         {
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
                    items: [
                        {
                            text: 'Delete',
                            iconCls: 'x-fa fa-trash',
                            tooltip: 'Delete Record',
                            table_name: 'tra_clinical_trial_monitors',
                            storeID: 'clinicaltrialmonitorssstr',
                            action_url: 'clinicaltrial/deleteClinicalTrialRecord',
                            action: 'actual_delete',
                            handler: 'doDeleteClinicalTrialWidgetParam',
                            hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                        }
                    ]
                }
            }
        }
    ]
});
