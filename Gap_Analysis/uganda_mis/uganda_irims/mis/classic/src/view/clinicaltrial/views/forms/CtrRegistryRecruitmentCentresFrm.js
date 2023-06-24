/**
 * Created by Kip on 1/19/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrRegistryRecruitmentCentresFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrregistryrecruitmentcentresfrm',
    controller: 'clinicaltrialvctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 3
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        }, {
            xtype: 'hiddenfield',
            name: 'id'
        },
       {
           xtype:'textfield',
           name:'name',
           fieldLabel:'Name',

       },{
            xtype:'textfield',
            name:'physical_address',
            fieldLabel:'Physical address',

        },{
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
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        
    },{
        xtype:'textfield',
        name:'postal_address',
        fieldLabel:'Postal address',

    },
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            handler: 'doCreateClinicalTrialParamWin',
            action_url: 'clinicaltrial/onSaverecruitmentCenter',
            table_name: 'tra_clinicaltrial_outcomes',
            storeID: 'onlineclinicaltrialrecruitmentgridstr',
        }
    ]
});