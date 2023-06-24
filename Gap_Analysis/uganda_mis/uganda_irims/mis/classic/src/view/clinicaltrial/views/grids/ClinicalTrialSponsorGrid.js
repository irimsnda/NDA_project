/**
 * Created by Kip on 1/18/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ClinicalTrialSponsorGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ClinicalTrialPersonnelAbstractGrid',
    controller: 'clinicaltrialvctr',
    xtype: 'clinicaltrialsponsorgrid',
    autoScroll: true,
    autoHeight: true,
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
    tbar: [
        {
            xtype: 'button',
            text: 'Add Clinical Study Site',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            name: 'add_clinical_site',
            childXtype: 'studysitesgrid',
            winTitle: 'Study Sites Selection',
            winWidth: '70%'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
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
                storeId: 'clinicaltrialstudysitesstr',
                proxy: {
                    url: 'clinicaltrial/getClinicalStudySites'
                }
            },
            isLoad: true
        }
    },
    columns: []
});
