/**
 * Created by Kip on 1/25/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ExternalAssessorFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'externalassessorfrm',
    controller: 'clinicaltrialvctr',
    layout: 'column',
    frame: true,
    bodyPadding: 4,
    defaults: {
        columnWidth: 1,
        labelAlign: 'right',
        allowBlank: false,
        margin: 5,
        labelWidth: 108,
        labelStyle: "font-weight:bold"
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'clinical_external_assessors'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Name',
            name: 'name'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Institution',
            name: 'institution'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Department',
            name: 'department'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Postal Address',
            name: 'postal_address'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            store: 'countriesstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        regionStore = form.down('combo[name=region_id]').getStore(),
                        filterObj = {country_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    regionStore.removeAll();
                    regionStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'region_id',
            store: 'regionsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            handler: 'doCreateClinicalTrialParamWin',
            action_url: 'clinicaltrial/saveClinicalTrialCommonData',
            table_name: 'clinical_external_assessors',
            //storeID: 'clinicaltrialmanagerassessmentstr',
            formBind: true
        }
    ]
});