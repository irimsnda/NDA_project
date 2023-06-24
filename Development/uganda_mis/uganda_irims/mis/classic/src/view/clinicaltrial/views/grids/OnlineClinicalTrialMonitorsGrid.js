/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.OnlineClinicalTrialMonitorsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ClinicalTrialPersonnelAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'onlineclinicaltrialmonitorsgrid',
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
    tbar: [
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
            var store = this.getStore(),
                grid = this.up('grid'),
                isCompare = grid.getIsCompare(),
                pnlXtype = 'clinicaltrialonlinepreviewpnl';
            if (isCompare == 1 || isCompare === 1) {
                pnlXtype = 'clinicaltrialportalcomparepreviewpnl';
            }
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
                storeId: 'onlineclinicaltrialmonitorsgridstr',
                proxy: {
                    url: 'clinicaltrial/getOnlineClinicalTrialMonitors'
                }
            },
            isLoad: true
        }
    },
    columns: [
        {
            text: 'Category',
            hidden: true,
            dataIndex: 'category',
            flex: 1
        }
    ]
   
});