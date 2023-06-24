/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.StudySitesGrid', {
    extend: 'Admin.view.commoninterfaces.grids.StudySitesAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'studysitesgrid',
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
            text: 'Add Study Site',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            name: 'add_study_site',
            childXtype: 'studysitefrm',
            winTitle: 'Study Site',
            winWidth: '70%'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
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
                remoteFilter: true,
                storeId: 'studysitesstr',
                proxy: {
                    url: 'clinicaltrial/getStudySitesList'
                }
            },
            isLoad: true
        },
        itemdblclick: 'onStudySiteDbClick'
    },
    columns: []
});
