/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.StudySiteFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'studysitefrm',
    controller: 'clinicaltrialvctr',
    scrollable:true,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'unset_data',
            value: 'isReadOnly,table_name,id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'study_sites'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    columnWidth: 0.9,
                    allowBlank: false,
                    fieldLabel: 'Site Name'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    tooltip: 'Search Study Site',
                    action: 'search_studysite',
                    childXtype: '',
                    winTitle: 'Study Site Selection List',
                    winWidth: '90%',
                    hidden: true,
                    margin: '30 0 0 0'
                }
            ]
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
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        districtStore = form.down('combo[name=district_id]').getStore(),
                        filterObj = {region_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    districtStore.removeAll();
                    districtStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'district_id',
            store: 'districtsstr',
            allowBlank: true,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name'
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: 'Physical Address',
            name: 'physical_address'
        },
         {
                xtype:'fieldcontainer',
                layout: {
                    type: 'column'
                },
                defaults:{
                    columnWidth: 0.49,
                    labelAlign: 'top'
                },
                items:[
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Latitude',
                        name: 'latitude',
                        allowBlank: true
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Longitude',
                        name: 'longitude',
                        allowBlank: true
                    }
                ]
        } ,
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: 'Postal Address',
            name: 'postal_address'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Telephone',
            name: 'telephone',
            allowBlank: true
        },
         {
            xtype: 'textarea',
            allowBlank:true,
            columnWidth: 0.99,
            fieldLabel: 'Description of the Clinic and counselling rooms',
            name: 'clinical_council'
        },
        {
            xtype: 'textarea',
            allowBlank:true,
            columnWidth: 0.99,
            fieldLabel: 'Description of the Emergency facilities',
            name: 'emergency'
        },
        {
            xtype: 'textarea',
            allowBlank:true,
            columnWidth: 0.99,
            fieldLabel: 'Description of the Facilities for special examinations (if required)',
            name: 'special_examination_facility'
        },{
            xtype: 'textarea',
            allowBlank:true,
            columnWidth: 0.99,
            fieldLabel: 'Capacity to collect, prepare, store and transport clinical samples',
            name: 'capacity'
        },{
            xtype: 'textarea',
            allowBlank:true,
            columnWidth: 0.99,
            fieldLabel: 'Storage and handling facilities for medicines',
            name: 'storage_facility'
        }
        ,{
            xtype: 'textarea',
            allowBlank:true,
            columnWidth: 0.99,
            fieldLabel: 'Name and qualifications of person with responsibility for dispensing medicines',
            name: 'staff_qualification'
        }
    ],


    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            handler: 'doCreateClinicalTrialParamWin',
            action_url: 'clinicaltrial/saveClinicalTrialCommonData',
            table_name: 'study_sites',
            storeID: 'studysitesstr',
        }
    ]
});