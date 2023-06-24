/**
 * Created by Kip on 1/18/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialPersonnelGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ClinicalTrialPersonnelAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'clinicaltrialpersonnelgrid',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
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
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    tbar: [
        {
            xtype: 'button',
            text: 'Add Personnel',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            name: 'add_clinicaltrial_personnel',
            childXtype: 'clinicaltrialpersonnelfrm',
            winTitle: 'Clinical Trial Personnel',
            winWidth: '55%',
            handler: 'showAddClinicalTrialParamWinFrm',
            stores: '[]'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'personnel_type'
        },
        {
            xtype: 'tbspacer'
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!'
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
                application_id = grid.down('hiddenfield[name=application_id]').getValue();
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
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: false,
                storeId: 'clinicaltrialpersonnelstr',
                proxy: {
                    url: 'clinicaltrial/getClinicalTrialPersonnelList'
                }
            },
            isLoad: true
        }
    },
    columns: []
});
